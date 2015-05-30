development:
  secret_key_base: 8824123cbe65dbf010981c37ca5176f6f16b5940d0784453bace46a09093c7c0c101dc4876386150cb382bffd7262730cce1804350599b653abbd249e6a350ba
  twitter_key: iJn7jBbI0N4IUXj8OUYwb3vhS
  twitter_secret: KiyNjVgmkVgFXSXTzsOykxjuSxCKl0lY054UM8BUTM9vCh4TcS
  access_token: 53974755-cTCAVYBonjC1T8pnbvYQun0ugkAsiOL0dL69JXbPR
  access_secret: sA9yk982CEpjnzQGpgn5evuE0p0HmjZw4At61n5SzAVHM

test:
  secret_key_base: 72263bba2a93b931b378d24f9936bb08c19063559c16feecc7e3289d1aec82eab78642fa157bf340e1f22d9af6ed7064dfcce1e86a8b2a05d4f200128ae9eddb

# Do not keep production secrets in the repository,
# instead read values from the environment.
production:
  secret_key_base: <%= ENV["SECRET_KEY_BASE"] %>