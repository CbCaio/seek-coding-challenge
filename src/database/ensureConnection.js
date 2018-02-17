// Ensures that a connection to the database has been made, and retries otherwise
function ensureConnection(knex, connectionAttempts = 10) {
  let waitTime = 500;
  let attemptsLeft = connectionAttempts;

  function checkConnection(resolve, reject) {
    return knex.raw('SELECT 1')
      .then(() => {
        console.log(`Connected to database after ${connectionAttempts - attemptsLeft + 1} attempts.`);
        return resolve();
      })
      .catch((err) => {
        if (attemptsLeft === 0) {
          return reject(err);
        }
        console.log(`Attempting to connect again to database. ${attemptsLeft} attempts left.`);

        setTimeout(() => checkConnection(resolve, reject), waitTime);
        waitTime *= 2;
        attemptsLeft -= 1;

        return err;
      });
  }

  return new Promise((resolve, reject) => {
    checkConnection(resolve, reject);
  });
}

module.exports = ensureConnection;
