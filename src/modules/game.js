export const API = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

export const gameId = async(gameName) => {
  const response = await fetch(`${API}/games/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
    },
    body:JSON.stringify(gameName)
    }
  );
  const game_id = response.json().then((data) => {
      if(response.status === 201){
        const result = data.result.split(" ");
        const id = result[3];
        let key = localStorage.getItem('leaderBoard');
        if(key === null){
          localStorage.setItem('leaderBoard', id);
          const new_key = localStorage.getItem('leaderBoard');
          return new_key;
        }else{
          return key;
        }
      }
    })
    .catch((err) => {
      return err;
    });
  return game_id;
}

export const addScores = async(id, data) => {
  const response = await fetch(`${API}/games/${id}/scores/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
    },
    body:JSON.stringify(data)
    }
  );
  const user = response.json().then((data) => {
      if(response.status === 201){
        return data.result;
      }
    })
    .catch((err) => {
      return err;
    });
  return user;
}

export const fetchScores = async(id) => {
  console.log(id)
  const response = await fetch(`${API}/games/${id}/scores/`,
  {
    method: 'GET',
    headers: {
      'Content-Type': "application/json"
   }
  }
  );
  const games = response.json().then((data) => {
    return data.result;
    })
    .catch((err) => {
      return err;
    });

  return games;
}

export const displayScores = (list) => {
  let str = '';
  if(list === null){
    str = `<li class="list-item">No scores</li>`
  }else{
    list.forEach((game) => {
      str += `<li class="list-item">${game.user}: ${game.score}</li>`
    });
    document.querySelector('.scores-list').innerHTML = str;
  }
}

export const showScoresToUI = async(scores) => {
  let key = localStorage.getItem('leaderBoard');
  if(key === null) {
    displayScores(scores);
  }else {
    scores = await fetchScores(key);
    displayScores(scores);
  }
}
