import fs from 'fs';
import path from 'path';

export default class SurveyService {

  static loadSurvey(surveyId) {
    const filePath = path.resolve(`backend/data/${surveyId}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  static getStep(survey, stepId) {
    return survey.steps.find(s => s.id === stepId);
  }

  static getNextStep(step) {
    if (step.redirection === 'FIN') return null;
    return step.redirection;
  }

  // Charger dynamiquement une table JSON
  static loadTable(tableName) {
    try {
      const filePath = path.resolve(`backend/data/${tableName}.json`);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      console.log("data auto",data)
      return data[tableName] || [];
    } catch (e) {
      console.error(`Impossible de charger la table ${tableName}`, e);
      return [];
    }
  }
}
