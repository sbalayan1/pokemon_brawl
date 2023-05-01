require "test_helper"

class UserTest < ActiveSupport::TestCase
  user = User.new(username: 'sean', first_name:'sean', last_name: 'balayan', email_address: 'sean@yahoo.com', password: '123456', password_confirmation: '123456')

  test "attributes #username, #first_name, #last_name, #email_address, and #password_digest return the username, first_name, last_name, email_address, and password_digest" do
    assert_equal user.username, 'sean'
    assert_equal user.username, 'sean'
    assert_equal user.first_name, 'sean'
    assert_equal user.last_name, 'balayan'
    assert_equal user.email_address, 'sean@yahoo.com'
    assert user.password_digest
  end

  test "should not save user without username, first_name, last_name, email_address, or password" do
    bad_user = User.new
    missing_user = User.new(username:"sean", first_name:"sean")
    assert_not bad_user.save
    assert_not missing_user.save
  end

  # test 'attributes #password and #password confirmation are unavailable within the user instance' do
  #   assert_not user.password
  #   # assert !user.password
  #   # assert !user.password_confirmation
  # end
end
