import { Configuration, OpenAIApi } from 'openai';

export class JobMatchingService {
  constructor() {
    this.openai = new OpenAIApi(new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY
    }));
  }

  async parseResume(resumeText) {
    const response = await this.openai.createCompletion({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "system",
        content: `Extract and structure the following information from this resume:
          1. Technical Skills (with proficiency levels)
          2. Soft Skills
          3. Work Experience (with years per role)
          4. Education
          5. Industry Experience
          6. Project Highlights
          7. Certifications
          8. Languages
          Return as structured JSON.`
      }, {
        role: "user",
        content: resumeText
      }]
    });
    return JSON.parse(response.data.choices[0].message.content);
  }

  calculateSkillMatch(candidateSkills, jobRequirements) {
    let score = 0;
    let totalWeight = 0;

    // Weight required skills more heavily
    jobRequirements.required.forEach(skill => {
      totalWeight += 2;
      if (candidateSkills.find(s => s.name.toLowerCase() === skill.toLowerCase())) {
        score += 2;
      }
    });

    // Nice-to-have skills
    jobRequirements.preferred.forEach(skill => {
      totalWeight += 1;
      if (candidateSkills.find(s => s.name.toLowerCase() === skill.toLowerCase())) {
        score += 1;
      }
    });

    return score / totalWeight;
  }

  calculateExperienceMatch(candidateExperience, jobRequirements) {
    const relevantExperience = candidateExperience.filter(exp => 
      jobRequirements.relevantIndustries.some(industry => 
        exp.industry.toLowerCase().includes(industry.toLowerCase())
      )
    );

    const totalYears = relevantExperience.reduce((sum, exp) => sum + exp.years, 0);
    const requiredYears = jobRequirements.yearsRequired;

    if (totalYears >= requiredYears) return 1;
    if (totalYears >= requiredYears * 0.7) return 0.8;
    if (totalYears >= requiredYears * 0.5) return 0.6;
    return 0.3;
  }

  calculateLocationMatch(candidatePreferences, jobLocation) {
    const { preferredLocations, remotePreference, maxCommuteDistance } = candidatePreferences;
    
    if (jobLocation.isRemote && remotePreference === 'remote') return 1;
    if (preferredLocations.includes(jobLocation.city)) return 1;

    if (this.isWithinCommuteDistance(jobLocation, candidatePreferences.location, maxCommuteDistance)) {
      const distance = this.calculateDistance(jobLocation, candidatePreferences.location);
      return 1 - (distance / maxCommuteDistance);
    }

    return 0;
  }

  calculateCompensationMatch(candidatePreferences, jobCompensation) {
    const { minSalary, preferredSalary } = candidatePreferences;
    const jobSalary = jobCompensation.salary;

    if (jobSalary >= preferredSalary) return 1;
    if (jobSalary >= minSalary) {
      return 0.7 + (0.3 * ((jobSalary - minSalary) / (preferredSalary - minSalary)));
    }
    return 0;
  }

  calculateSuccessProbability(candidateProfile, job) {
    const weights = {
      skillMatch: 0.35,
      experienceMatch: 0.25,
      locationMatch: 0.20,
      compensationMatch: 0.10,
      cultureFit: 0.10
    };

    const skillScore = this.calculateSkillMatch(candidateProfile.skills, job.requirements);
    const experienceScore = this.calculateExperienceMatch(candidateProfile.experience, job.requirements);
    const locationScore = this.calculateLocationMatch(candidateProfile.preferences, job.location);
    const compensationScore = this.calculateCompensationMatch(candidateProfile.preferences, job.compensation);
    const cultureFitScore = this.calculateCultureFit(candidateProfile, job.company);

    return (
      (skillScore * weights.skillMatch) +
      (experienceScore * weights.experienceMatch) +
      (locationScore * weights.locationMatch) +
      (compensationScore * weights.compensationMatch) +
      (cultureFitScore * weights.cultureFit)
    );
  }

  async rankJobs(jobs, candidateProfile, userPreferences) {
    const scoredJobs = jobs.map(job => {
      const successProbability = this.calculateSuccessProbability(candidateProfile, job);
      const locationScore = this.calculateLocationMatch(userPreferences, job.location);
      const compensationScore = this.calculateCompensationMatch(userPreferences, job.compensation);

      const finalScore = (
        (successProbability * userPreferences.weights.successProbability) +
        (locationScore * userPreferences.weights.location) +
        (compensationScore * userPreferences.weights.compensation)
      );

      return {
        ...job,
        scores: {
          success: successProbability,
          location: locationScore,
          compensation: compensationScore,
          final: finalScore
        }
      };
    });

    return scoredJobs.sort((a, b) => b.scores.final - a.scores.final);
  }

  calculateDistance(point1, point2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = this.toRad(point2.lat - point1.lat);
    const dLon = this.toRad(point2.lon - point1.lon);
    const lat1 = this.toRad(point1.lat);
    const lat2 = this.toRad(point2.lat);

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  toRad(value) {
    return value * Math.PI / 180;
  }

  isWithinCommuteDistance(jobLocation, userLocation, maxDistance) {
    const distance = this.calculateDistance(jobLocation, userLocation);
    return distance <= maxDistance;
  }

  calculateCultureFit(candidateProfile, company) {
    // Simplified culture fit calculation
    let score = 0;
    let factors = 0;

    // Work style match
    if (candidateProfile.preferences.workStyle === company.workStyle) {
      score += 1;
    }
    factors += 1;

    // Company size preference match
    if (this.isCompanySizeMatch(candidateProfile.preferences.companySize, company.size)) {
      score += 1;
    }
    factors += 1;

    // Industry experience
    if (candidateProfile.experience.some(exp => exp.industry === company.industry)) {
      score += 1;
    }
    factors += 1;

    return score / factors;
  }

  isCompanySizeMatch(preference, actual) {
    const sizes = ['startup', 'small', 'medium', 'large', 'enterprise'];
    const prefIndex = sizes.indexOf(preference);
    const actualIndex = sizes.indexOf(actual);
    return Math.abs(prefIndex - actualIndex) <= 1;
  }
}

export default JobMatchingService;
