// PlanetList.jsx
import { Link } from 'react-router-dom';
import data from '../data.json';

function PlanetList() {
  return (
    <div>
              {data.map((planet) => (
          <Link key={planet.name} to={`/planet/${planet.name.toLowerCase()}`}>
            {planet.name}
          </Link>
        ))}
          </div>
  );
}

export default PlanetList;