import axios from 'axios';

const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECRET_ID';
const params = '?client_id=' + id + '?client_secret=' + sec;

const getProfile = username => {
    return axios.get('https://api.github.com/users/' + username + params)
        .then(user => user.data)
}

const getRepos = username => {
    return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100');
}

const getStarCount = repos => repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count
}, 0);

const calculateScore = (profile, repos) => {
    const followers = profile.followers;
    const totalStars = getStarCount(repos);
    return followers + totalStars;
}

const handleError = error => console.error(error);

const getUserData = player => {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(data => {
        const profile = data[0];
        const repos = data[1];
        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    })
}

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

const battle = players => {
    return axios.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError)
}

const fetchPopularRepos = (language) => {
    const encodeURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');
    return axios.get(encodeURI)
        .then(response => response.data.items)
        .catch(error => error);
}

export {
    fetchPopularRepos,
    battle
}
