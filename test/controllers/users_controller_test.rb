require "test_helper"
require 'json'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "creates a new user without password and password confirmation" do
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

  test "does not create a new user with mismatched passwords or missing information and throws an unprocessable_entity error" do

    post "/api/signup", params: {username:"sean", first_name:"sean", last_name:"balayan", email_address:"sean@yahoo.com", password:"1234", password_confirmation:"123456"}
    assert_response :unprocessable_entity

    post "/api/signup", params: {first_name:"sean", last_name:"balayan", email_address:"sean@yahoo.com", password:"1234", password_confirmation:"123456"}
    assert_response :unprocessable_entity
  end

end


