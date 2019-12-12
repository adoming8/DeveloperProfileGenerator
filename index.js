
var fs = require('fs'); // loading FileSystem library
var inquirer = require('inquirer');
var axios = require("axios");

inquirer
    .prompt({
        message:'Please enter your GitHub username: ',
        name: "username"
    })
    .then(function ({username}) {
        var qUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
        axios.get(qUrl).then(function (res) {   // server side http request 
            var repo_list = res.data.map(function (data) {
                return data.name;
            });
            var repos_Str = repo_list.join("\n");
            // console.log(repoNames)
            fs.writeFile('Usersrepo_list.txt', repos_Str, () => {} ); // writing txt file with repos
        });
    });