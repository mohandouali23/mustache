// // SurveyManager.js
// // Gestion des réponses d'un questionnaire

// export default class SurveyManager {
//     constructor(surveyId, userId = 'anonymous') {
//       this.surveyId = surveyId;
//       this.userId = userId;
//       this.answers = []; // tableau de réponses normalisées
//     }
  
//     /**
//      * Ajouter ou remplacer une réponse
//      * @param {String} stepId
//      * @param {String} type
//      * @param {*} value
//      */
//     submitQuestion(stepId, type, value) {
//       const answer = { questionId: stepId, type, value };
//       const idx = this.answers.findIndex(a => a.questionId === stepId);
//       if (idx > -1) this.answers[idx] = answer;
//       else this.answers.push(answer);
//     }
  
//     /**
//      * Envoyer toutes les réponses à la fin du questionnaire
//      */
//     async submitSurvey() {
//       const payload = {
//         surveyId: this.surveyId,
//         userId: this.userId,
//         answers: this.answers
//       };
  
//       try {
//         const res = await fetch('/api/responses', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(payload)
//         });
  
//         if (res.ok) {
//           alert('Merci pour votre participation !');
//         } else {
//           const err = await res.text();
//           console.error('Erreur serveur:', err);
//           alert('Erreur serveur, essayez de nouveau');
//         }
//       } catch (err) {
//         console.error('Erreur fetch:', err);
//         alert('Erreur réseau, essayez de nouveau');
//       }
//     }
//   }
  