require "test_helper"
require 'json'

class UsersControllerTest < ActionDispatch::IntegrationTest

  ###POST '/api/signup', to: 'users#create'
  test "creates a new user without password and password confirmation, returns a json response, and responds with a CREATED status code." do
    post "/api/signup", params: {username: "sean", first_name: "sean", last_name: "balayan", email_address: "sean@yahoo.com", password: "123456", password_confirmation: "123456"}, as: :json
    assert_response :created
  
    expected_response = {id: User.last.id, username: "sean", first_name: "sean", last_name: "balayan", email_address: "sean@yahoo.com", teams: [], pokemons: []}

    ##loop over the response body's attrbutes and compare each attribute to the expected response. 
    response.parsed_body.each do |key, result|
      expected = expected_response[key.to_sym] #key is a string. need to convert to a symbol in order to access symbols within expected_res
      assert_equal expected, result ###expected compared to result
    end

    assert_not response.parsed_body["password"]
    assert_not response.parsed_body["password_confirmation"]
  end

  test "does not create a new user with mismatched passwords or missing information and returns an UNPROCESSABLE ENTITY error" do

    post "/api/signup", params: {username:"sean", first_name:"sean", last_name:"balayan", email_address:"sean@yahoo.com", password:"1234", password_confirmation:"123456"}
    assert_response :unprocessable_entity

    post "/api/signup", params: {first_name:"sean", last_name:"balayan", email_address:"sean@yahoo.com", password:"1234", password_confirmation:"123456"}
    assert_response :unprocessable_entity
  end



  ### GET '/api/current_user', to: 'users#show_current_user'
  test "GET '/api/current_user' displays the current user after being authorized and returns an OK status code" do
    #creates a test user
    post "/api/signup", params: {username: "sean", first_name: "sean", last_name: "balayan", email_address: "sean@yahoo.com", password: "123456", password_confirmation: "123456"}, as: :json
    assert_response :created

    #login and create a session
    post "/api/login", params: {username: "sean", password: "123456"}
    assert_response :ok

    get "/api/current_user"
    assert_response :ok

    expected_response = {id: User.last.id, username: "sean", first_name: "sean", last_name: "balayan", email_address: "sean@yahoo.com", teams: [], pokemons: []}

    puts expected_response, response.parsed_body

    response.parsed_body.each do |key, result|
      expected = expected_response[key.to_sym] #key is a string. need to convert to a symbol in order to access symbols within expected_res
      assert_equal expected, result ###expected compared to result
    end
  end


end


