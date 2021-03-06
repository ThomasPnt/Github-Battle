import axios from 'axios';

var id = "1eb227b767a740e33d9a";
var sec = "af16b128fde7860859c07d2b01b4d97e232a502c";
var params = "?client_id=" + id + "&client_secret=" + sec;


function getProfile(username){
    return axios.get('https://api.github.com/users/'+ username + params)
        .then((user) => user.data )
}

function getRepos(username){
    return axios.get('https://api.github.com/users/'+ username + '/repos' + params + '&per_page=100')
}

function getStarCount(repos){
    return repos.data.reduce(function (count,repo) {
        return count + repo.stargazers_count;
    }, 0)
}

function calculateScore(profile,repos) {
    var followers = profile.followers;
    var totalStars = getStarCount(repos)

    return (followers * 3) + totalStars;
}

function handleError(error){
    console.warn(error);
    return null;
}

function getUserData(player) {
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then((data) => {
        var profile = data[0]
        var repos = data[1]
        return {
            profile : profile,
            score : calculateScore(profile,repos)
        }
    })
}

function sortPlayers(players){
    return players.sort((a,b) => {
        return b.score - a.score;
    })
}

module.exports = {
    fetchPopularRepos: function(language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language +'&sort=stars&order=desc&type=Repositories');
    
        return axios.get(encodedURI)
            .then((response) => response.data.items);
    },
    
    battle: function(players) {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    }
}