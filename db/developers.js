function Developers() {
  const developerObj = {};
  let id = 0;

  const addDeveloper = ({ developer }) => {
    developerObj[id] = { id, developer };
    id++;
  };

  const getDeveloper = (id) => {
    return developerObj[id];
  };

  const getDevelopers = () => {
    return Object.values(developerObj);
  };

  return { addDeveloper, getDeveloper, getDevelopers };
}

const developers = Developers();

module.exports = developers;
