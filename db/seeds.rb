

# clear old data
User.delete_all

puts 'create user'
User.create(username: 'sean', first_name: 'sean', last_name: 'balayan', email_address: 'balayans2014@yahoo.com', age: 25, password: '123456', password_confirmation: '123456')
