require 'pry'
require 'faraday/typhoeus'

puts 'running test seed'

### The below clears old data. Once we deploy we probably don't want to include this. 
puts 'clear old data'
User.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('users')

Pokemon.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('pokemons')

PokemonTeam.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('pokemon_teams')

User.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('users')
        
Team.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('teams')

### you should never need to delete the move database. The Moves table should only need to be seeded once. Afterwards, whenever this seed file is run, 
Move.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('moves')

PokemonMove.delete_all
ActiveRecord::Base.connection.reset_pk_sequence!('pokemon_moves')

def isOnlyLetters(str)
    str.match?(/[A-z]/)
end

puts 'seeding pokemon'
if Move.all.length == 0 #check if Pokemon data is already seeded. This is necessary for our deploy. This way we won't seed the Pokemon unless the table is empty

    ### used for parallelized requests to seed Pokemon Move data
    puts "fetching pokemon move data concurrently"
    conn = Faraday.new(:url => 'https://pokeapi.co/') do |builder|
        builder.request :url_encoded
        builder.response :json
        builder.adapter :typhoeus
    end

    responses = []
    conn.in_parallel do
        responses = 900.times.map do |count| 
            conn.get("/api/v2/move/#{count + 1}")
        end
    end

    puts "fetch complete. filtering moves"

    ### filter responses for moves with power > 0 with move description's 
    filtered_moves = responses.filter do |obj|
        move = obj.body

        has_all_keys = true
        ['name', 'power', 'pp', 'flavor_text_entries'].each do |key|
            if (!move.has_key?(key))
                has_all_keys = false
                return
            end
        end 


        if (has_all_keys && move['flavor_text_entries'].length > 0)
            move if (move['power'].class == Integer && move['power'] > 0)
        end
        #     move
        # end
    end

    puts "filter complete. creating moves"

    filtered_moves.each do |move|

        ####undefined method sub for nil class
        name = move['name'].sub("-", " ").titleize #searches for dashes in string and replaces with a space then capitalizes
        power = move['power']
        power_points = move['pp']
        description = move['flavor_text_entries'].find { |obj| obj['language']['name'] == "en" && obj['version_group']['name'] == 'black-white' }['flavor_text'].sub("\n", " ") #filter for english descriptions and substitute all \n with a space.

        Move.create!(name: name, power: power, power_points: power_points, description: description);
    end

    #note there are 903 available moves to seed however we hit an error at move 560
    # while (id <= 559) do
    #     puts "seeding move # #{id}"
    #     url = "https://pokeapi.co/api/v2/move/#{id}"
    #     uri = URI.parse(url)
    #     response = Net::HTTP.get_response(uri)
    #     move = JSON.parse(response.body)

#         if (move['power'] && move['flavor_text_entries'].length > 0)
#             name = move['name'].sub("-", " ").titleize #searches for dashes in string and replaces with a space then capitalizes
#             # name.sub("-", " ") #searches for dashes in string and replaces with a space
#             power = move['power']
#             power_points = move['pp']

#             # binding.pry
#             description = move['flavor_text_entries'].find { |obj| obj['language']['name'] == "en" && obj['version_group']['name'] == 'black-white' }['flavor_text'].sub("\n", " ") #filter for english descriptions and substitute all \n with a space.
        
#             #for descriptions with -\n, we need to
#                 #remove the \n with the sub method
#                 #split the strings by space
#                 #iterate over array of strings
#                     #split the string and pass each letter to the isOnlyLetters method
#                         #if is letter, return letter
#                         #return ""


#             Move.create!(name: name, power: power, power_points: power_points, description: description);
#         end

        # id += 1
end

puts 'creating users'
if User.all.length == 0
    first_user = User.create(username: 'sean', first_name: 'sean', last_name: 'balayan', email_address: 'balayan123@email.com', password: '123456', password_confirmation: '123456')
    Team.create(name: "test", user_id: first_user.id)

end
    # 9.times do 
    #     password = Faker::Alphanumeric.alpha(number: 10)
    #     first_name = Faker::Name.first_name
    #     last_name = Faker::Name.last_name
    #     username = first_name + last_name

    #     User.create(username: username, first_name: first_name,last_name: last_name, password: password, password_confirmation: password, email_address: Faker::Internet.email)
    # end



puts 'done seeding'