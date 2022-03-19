<div align="center">
  <img height="100px" src="https://static.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png/revision/latest/scale-to-width-down/767?cb=20140520015336" alt="PokeBall"/>
</div>
  
<h1 align="center">
    PokemonBrawl
</h1>

<p>
  🎮Just like old Pokemon Games, PokemonBrawl is a mock Pokemon Battle Application that allows users to catch Pokemon, build and customize teams, and battle other trainers!
</p>

<h2>
  LOOK HERE! Launch the application through your local environment. 
</h2>

<h4>PostgreSQL Installation for WSL</h4>
<p>PostgreSQL is utilized as my database. This needs to be downloaded to be used. To install Postgres for WSL, run the following commands from your Ubuntu terminal:</p>
    
    - sudo apt update
    - sudo apt install postgresql postgresql-contrib libpq-dev
  
<p>Then confirm that Postgres was installed successfully:</p>

    - psql --version

<p>Run this command to start the Postgres service:</p>
  
    - sudo service postgresql start
  
<p>Finally, you'll also need to create a database user so that you are able to connect to the database from Rails. First, check what your operating system username is:</p>
  
    - whoami

<p>If your username is "ian", for example, you'd need to create a Postgres user with that same name. To do so, run this command to open the Postgres CLI:</p>
  
    - sudo -u postgres -i

<p>From the Postgres CLI, run this command (replacing "ian" with your username):</p>
  
    - createuser -sr ian

<p>Then enter control + d or type logout to exit.</p>

<h3>Start the application</h3>
<p>1. In your terminal, run the following commands first to setup, create and seed the database</p>

    - bundle install
    - rake db:migrate
    - rake db:seed

<p>2. In your terminal, run the following commands to start the server. A window to localhost:3000 should open in your browser. This serves as your view into the database. You will not need this unless you are developing. Keep this to the side.</p>
    
    - bin/rails server

<p>3. In a NEW terminal, run the following commands to start the client and select YES. A window to localhost:3001 should open in your browser. This serves as the user interface for the game. Feel free to make an account, catch pokemon, and battle!</p>

    - npm start --prefix client
    
<p>4. CONGRATS! You can now access PokemonBrawl!!</p>

<h2>>⚠️I am currently refactoring my backend!!! The application may not be working at the moment!!!</h2>

<h2>
  📖Table of Contents
</h2>
<ul> 
  <li>Demo</li>
  <li>Features</li>
  <li>Instructions</li>
  <li>Wireframes</li>
  <li>Coming Soon</li>
  <li>About</li>
  <li>Contact</li>
</ul>

<h2>
  📹Demo
</h2>

<a href="https://www.loom.com/share/d5a1338edc5e44c9af19149239ee4b51?sharedAppSource=personal_library" target="_blank">
<img src="https://www.loom.com/share/d5a1338edc5e44c9af19149239ee4b51" 
alt="PokemonBrawl Loom Video" width="240" height="180" border="10" /></a>

<h2>
  ⚒️Features
</h2>

  - Sign up and Login via BCrypt auth
  - Catch Pokemon via Who's that Pokemon? or the Safari Zone
  - View the Pokemon in your PC
  - Build and customize your team
  - Battle random trainers
  - View current Battle Leaderboards

<h2>
  📜Instructions
</h2>

<h2>
  Wireframes
</h2>

<p> https://miro.com/app/dashboard/ </p>

<h2>
  ⚠️Coming Soon
</h2>

<p>
  Currently working on fixing issues with seed data. I need to learn how to make API calls to my backend so I can seed the Pokemon data. The hope here is that this will fix issues with deploying to Heroku and we will be able to have a functioning web application. 
</p>


<h2>
  🙋‍♂️About
</h2>

<p>
After graduating from the University of San Francisco, I spent some time working as a Hedge Fund Associate at Asymmetry Capital Management. There I assisted the Healthcare Investment team with equity valuation, financial modeling, and research. After some time I came to the the conclusion that this career wasn't for me and left. Feeling lost, unstructured, and unfulfilled, albeit with endless potential, I eventually found myself applying to Flatiron School. And of course the rest is history. 

Now that I've graduated I spend most of my time coding and searching for new opportunities. Current interests include equity markets, crypto, AI, machine learning, game development, and anything tech related. 
</p>

<p>Front End -> JavaScript, React </p>
<p>Back End -> Ruby on Rails </p>
<p>Other Skills -> Redux, SQL, PostgreSQL, ActiveRecord, BCrypt, MaterialUI, Postman API, JSON, MVC Architecture, REST conventions, Rack, Hooks, State, Event Handling, Conditional Rendering</p>

<h2>
  📫Contact
</h2>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)][1]
[![Blog](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)][2]
[![Email](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)][3]

[1]: https://www.linkedin.com/in/sean-balayan/
[2]: https://sheeep.medium.com/
[3]: balayans2014@gmail.com
