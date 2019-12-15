
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
        <!DOCTYPE html>
        <html>
        <head>
          <!--Import Google Icon Font-->
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          <!--Import materialize.css-->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">
          <link rel="stylesheet" href="style.css">
          <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js" integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl"
            crossorigin="anonymous"></script>
            <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyBzjrmFrz1FwngueZlNFd60EaYGkxg6NBA"></script> 
          <!--Let browser know website is optimized for mobile-->
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Raid your Fridge</title>
        </head>
        
        <body id="home" class="scrollspy">
        
         <section id="search" class="section section-search blue lighten-4 white-text center ">
            <div class="container">
              <div class="row" style = 'width: 200px; height: 200px;'>
                <div class="col  blue-text">
                  <div class="card-panel ${this.color}"  style = 'width: 350px; height: 280px;'>
                    <img src="${this.avatar_url}" alt="TBD" class="materialboxed responsive-img " style="width: 50px; height: 50px; position: relative; display: block; margin-left: auto; margin-right: auto; border-radius: 400px;">
                    <h5 class="black-text">My name is ${this.name}</h5>
                    <h5 class="black-text">I'm located in ${this.location}</h5>
                    <h5 class="black-text">My Github Blog ${this.blog}</h5>
                  </div>
                </div>
              </div>
            </div>
          </section>
        
          <section class="section section-icons grey lighten-4 center">
            <div class="container">
              <div class="row" style="margin-left:200px ;">
                <div class="col">
                  <div class="card-panel ${this.color}">
                    <h6 class="blue-text">Public Repos</h6>
                    <h6>${this.public_repos}</h6>
                  </div>
                </div>
                <div class="col">
                  <div class="card-panel ${this.color}">
                    <h6 class="blue-text">Followers</h6>
                    <h6>${this.followers}</h6>
                  </div>
                </div>
                <div class="col">
                    <div class="card-panel ${this.color}">
                      <h6 class="blue-text">GitHub Stars</h6>
                      <h6>${this.stars}</h6>
                    </div>
                  </div>
                  <div class="col">
                    <div class="card-panel ${this.color}">
                      <h6 class="blue-text">Following</h6>
                      <h6>${this.following}</h6>
                    </div>
                  </div>
              </div>
            
            </div>
          </section>
        
          <section id="popular" class="section blue lighten-4 section-popular scrollspy">
            <div class="container">
              <div class="row" style = 'height: 100px';>
              </div>
            </div>
          </section>
        
          <!--JavaScript at end of body for optimized loading-->
          <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
        
          <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
          crossorigin="anonymous"></script>
        
          <script src="script.js"></script>
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



