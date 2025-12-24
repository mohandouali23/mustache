export default class NavigationRuleService {

  static evaluateRule(rule, answerValue) {
    const value = answerValue;

    switch (rule.operator) {
      case 'EQUALS':
        return value === rule.value;

      case 'NOT_EQUALS':
        return value !== rule.value;

      case 'IN':
        return Array.isArray(value)
          ? value.some(v => rule.values.includes(v))
          : rule.values.includes(value);

      case 'NOT_IN':
        return Array.isArray(value)
          ? !value.some(v => rule.values.includes(v))
          : !rule.values.includes(value);

      case 'LT':
        return Number(value) < rule.value;

      case 'LTE':
        return Number(value) <= rule.value;

      case 'GT':
        return Number(value) > rule.value;

      case 'GTE':
        return Number(value) >= rule.value;

      case 'BETWEEN':
        return Number(value) >= rule.values[0] &&
               Number(value) <= rule.values[1];

      case 'FILLED':
        return value !== null && value !== undefined && value !== '';

      case 'EMPTY':
        return value === null || value === undefined || value === '';

      default:
        return false;
    }
  }

  /**
   * Résout la navigation pour une question donnée
   */
  static resolve(step, answerValue, steps) {

    const navigation = step.navigation;

    // 1️⃣ Règles conditionnelles
    if (navigation?.rules?.length) {
      for (const rule of navigation.rules) {
        const match = this.evaluateRule(rule.if, answerValue);
        if (match) {
          return rule.then.goTo;
        }
      }
    }

    // 2️⃣ Default navigation
    if (navigation?.default === 'NEXT') {
      return this.getNextSequentialStep(step, steps);
    }

    if (navigation?.default === 'redirection') {
      return step.redirection;
    }

    // 3️⃣ Fallback historique
    return step.redirection;
  }

  static getNextSequentialStep(step, steps) {
    const index = steps.findIndex(s => s.id === step.id);
    return steps[index + 1]?.id || 'FIN';
  }
}
