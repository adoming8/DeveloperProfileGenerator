
const inquirer = require ('inquirer')
const axios = require ('axios');
const pdf = require ('html-pdf')

class DoMyHomework {

    constructor () {
        this.githubUserName = null; // properties that will be defined in the future
        this.color = null;
        this.location = null; 
        this.profilePicture = null;
        this.followers = null;
        this.numOfRepos = null;
        this.following = null;
        this.numberofStars = null;

    }

    promptUser(){
        return inquirer.prompt([
            {
            message: 'What is your Username',
            name:'githubUserName'
            },
            {
            message:'What is your favorite color?',
            name:'color'  
            }
        ]).then(answers => {
            // console.log(this); //operator this refer to newHomework Object
            this.githubUserName = answers.githubUserName
            this.color = answers.color
            // console.log(this);
            this.makeApiRequest();

        })
    }
    makeApiRequest(){
        return Promise.all ([axios.get(`https://api.github.com/users/${this.githubUserName}`),axios.get(`https://api.github.com/users/${this.githubUserName}/starred`)]
)            .then(([{data:{ avatar_url, location, name, blog, bio, public_repos, followers, following,}}, {data: {length}}]) => {
                this.avatar_url = avatar_url;
                this.location = location;
                this.name = name;
                this.blog = blog;
                this.bio = bio;
                this.public_repos = public_repos;
                this.followers = followers;
                this.following = following;
                this.stars = length;
                this.color = this.color;
                // console.log(this);
                // console.log(length)
                // console.log(this.color);
                this.createHthml();
            })
    }
    createHthml(){
        this.html = `
        <html>
        <body>
        name: ${this.name}
        </body>
        </html>
        `;
        console.log(this)
        this.createPdf();
    }
    createPdf(){
        pdf.create(this.html).toFile('./gitHubProfile.pdf' , function(err, res){
            if (err) return console.log(err);
            console.log(res)
        })
    }

}


var newHomework = new DoMyHomework();
// console.log(newHomework);
newHomework.promptUser();



