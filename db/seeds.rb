

# clear old data
User.delete_all

puts 'create user'

User.create(username: 'sean', first_name: 'sean', last_name: 'balayan', email_address: 'balayans2014@yahoo.com', age: 25, password: '123456', password_confirmation: '123456')



10.times do 
    password = Faker::Alphanumeric.alpha(number: 10)
    age = rand(5..50)

    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    username = first_name + last_name

    User.create(username: username, first_name: first_name,last_name: last_name, password: password, password_confirmation: password, email_address: Faker::Internet.email, age: age)
end


puts 'done seeding'