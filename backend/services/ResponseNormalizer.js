export default class ResponseNormalizer {

    /**
     * Normalise la réponse d'une question selon le type
     * @param {Object} step - objet question
     * @param {any} rawValue - valeur brute envoyée par le formulaire
     * @returns {Object} réponse normalisée { questionId, type, value }
     */
    static normalize(step, rawValue) {
      let value;
  
      switch(step.type) {
  
        case 'text':
        case 'spinner':
          value = rawValue;
          break;
  
        case 'single_choice':
          const selectedCode = rawValue;
          const selectedOption = step.options.find(o => String(o.codeItem) === String(selectedCode));
          value = selectedOption ? { codeItem: selectedOption.codeItem, label: selectedOption.label } : null;
          break;
  
        case 'multiple_choice':
          const selectedCodes = Array.isArray(rawValue) ? rawValue : [rawValue];
          value = step.options
            .filter(o => selectedCodes.includes(String(o.codeItem) || o.value))
            .map(o => ({ codeItem: o.codeItem, label: o.label }));
          break;
  
        case 'autocomplete':
          try {
            value = JSON.parse(rawValue); // doit être envoyé comme JSON depuis le front
          } catch(e) {
            value = rawValue || null;
          }
          break;
  
        case 'grid':
          // rawValue = { rowId: [values] }
          value = Object.entries(rawValue || {}).map(([rowId, vals]) => {
            const rowObj = {};
            if (!Array.isArray(vals)) vals = [vals];
            rowObj[rowId] = vals.map(v => {
              const col = step.columns.find(c => c.value == v);
              return { value: v, label: col ? col.label : v };
            });
            return rowObj;
          });
          break;
  
        default:
          value = rawValue;
          break;
      }
  
      return {
        questionId: step.id,
        type: step.type,
        value
      };
    }
  }
  