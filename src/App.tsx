
import './App.css';
import './index.css';
import { Link } from 'react-router-dom';

function App() {
  return (
      <div className="container">
        <div className="note">
          <p>
            В этой игре нужно выйти из комнаты.
            <br />
            Чтобы идти дальше, ищите мышкой всплывающие слова.
            <br />
            Следите за подсказками.
          </p>

          <p>
              <Link to="/start">Начать</Link>
          </p>
        </div>
      </div>
  );
}

export default App;
