

# puts 'clear old data'
#     User.delete_all
#     ActiveRecord::Base.connection.reset_pk_sequence!('users')
#     Trainer.delete_all
#     ActiveRecord::Base.connection.reset_pk_sequence!('trainers')
#     Battle.delete_all
#     ActiveRecord::Base.connection.reset_pk_sequence!('battles')

puts 'create user'
    User.create(username: 'sean', first_name: 'sean', last_name: 'balayan', email_address: 'balayan123@email.com', age: 50, password: '123456', password_confirmation: '123456')

    9.times do 
        password = Faker::Alphanumeric.alpha(number: 10)
        age = rand(5..50)

        first_name = Faker::Name.first_name
        last_name = Faker::Name.last_name
        username = first_name + last_name

        User.create(username: username, first_name: first_name,last_name: last_name, password: password, password_confirmation: password, email_address: Faker::Internet.email, age: age)
    end

puts 'create trainer'
    Trainer.create(name: 'Sean', gender: true, img_url: 'https://archives.bulbagarden.net/media/upload/4/4c/Spr_RB_Red_2.png', user_id: User.first.id)

    Trainer.create(name: 'Red', gender: true, img_url: 'https://archives.bulbagarden.net/media/upload/6/66/Spr_RG_Red_1.png', user_id: User.second.id)

    Trainer.create(name: 'Blue', gender: true, img_url: 'https://archives.bulbagarden.net/media/upload/9/92/Spr_RG_Blue_1.png', user_id: User.third.id)

    Trainer.create(name: 'Brock', gender: true, img_url: 'https://archives.bulbagarden.net/media/upload/e/e2/Spr_RG_Brock.png', user_id: User.fourth.id)

    Trainer.create(name: 'Misty', gender: false, img_url: 'https://archives.bulbagarden.net/media/upload/2/2d/Spr_RG_Misty.png', user_id: 5)

    Trainer.create(name: 'Sabrina', gender: false, img_url: 'https://archives.bulbagarden.net/media/upload/1/13/Spr_RG_Sabrina.png', user_id: 6)

    Trainer.create(name: 'Agatha', gender: false, img_url: 'https://archives.bulbagarden.net/media/upload/f/f4/Spr_RG_Agatha.png', user_id: 7)

    Trainer.create(name: 'Lance', gender: true, img_url: 'https://archives.bulbagarden.net/media/upload/e/eb/Spr_RG_Lance.png', user_id: User.all[7].id)

    Trainer.create(name: 'Oak', gender: true, img_url: 'https://archives.bulbagarden.net/media/upload/1/1e/Spr_RG_Oak.png', user_id: User.all[8].id)

    Trainer.create(name: 'Giovanni', gender: true, img_url: 'https://archives.bulbagarden.net/media/upload/2/23/Spr_RG_Giovanni.png', user_id: User.all[9].id)

# puts 'battles'

#     Battle.create(trainer_id: User.first.id, opponent_id: User.second.id, win_loss: true)
#     Battle.create(trainer_id: User.first.id, opponent_id: User.third.id, win_loss: true)
#     Battle.create(trainer_id: User.first.id, opponent_id: User.fourth.id, win_loss: true)
#     Battle.create(trainer_id: User.first.id, opponent_id: 5, win_loss: true)

# puts 'seed pokemonteam'
# PokemonTeam.create(trainer_id: 2, pokemon_id: Pokemon.all[0].id, team_member: true)
# PokemonTeam.create(trainer_id: 3, pokemon_id: Pokemon.all[5].id, team_member: true)
# PokemonTeam.create(trainer_id: 4, pokemon_id: Pokemon.all[23].id, team_member: true)
# PokemonTeam.create(trainer_id: 5, pokemon_id: Pokemon.all[0].id, team_member: true)
# PokemonTeam.create(trainer_id: 6, pokemon_id: Pokemon.all[5].id, team_member: true)
# PokemonTeam.create(trainer_id: 7, pokemon_id: Pokemon.all[23].id, team_member: true)
# PokemonTeam.create(trainer_id: 8, pokemon_id: Pokemon.all[0].id, team_member: true)
# PokemonTeam.create(trainer_id: 9, pokemon_id: Pokemon.all[5].id, team_member: true)
# PokemonTeam.create(trainer_id: 18, pokemon_id: Pokemon.all[23].id, team_member: true)


# puts 'done seeding'

# puts 'seeding PokemonTeam'
# 6.times do
#     number = rand(0..151)
#     PokemonTeam.create(trainer_id: 2, pokemon_id: Pokemon.all[number].id, team_member: true)
# end 

# 6.times do
#     number = rand(0..151)
#     PokemonTeam.create(trainer_id: 3, pokemon_id: Pokemon.all[number].id, team_member: true)
# end 


# 6.times do
#     number = rand(0..151)
#     PokemonTeam.create(trainer_id: 4, pokemon_id: Pokemon.all[number].id, team_member: true)
# end 

# 6.times do
#     number = rand(0..151)
#     PokemonTeam.create(trainer_id: 5, pokemon_id: Pokemon.all[number].id, team_member: true)
# end 

# 6.times do
#     number = rand(0..151)
#     PokemonTeam.create(trainer_id: 6, pokemon_id: Pokemon.all[number].id, team_member: true)
# end 

# 6.times do
#     number = rand(0..151)
#     PokemonTeam.create(trainer_id: 7, pokemon_id: Pokemon.all[number].id, team_member: true)
# end 

# 6.times do
#     number = rand(0..151)
#     PokemonTeam.create(trainer_id: 8, pokemon_id: Pokemon.all[number].id, team_member: true)
# end 

# 6.times do
#     number = rand(0..151)
#     PokemonTeam.create(trainer_id: 9, pokemon_id: Pokemon.all[number].id, team_member: true)
# end 

# 5.times do
#     number = rand(0..151)
#     PokemonTeam.create(trainer_id: 18, pokemon_id: Pokemon.all[number].id, team_member: true)
# end 

# puts 'done seeding'