<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?

    the purpose of a session is to store data that you want access to across requests. Users visiting a site get a unique session that can be used to store and access data as they browse. This is an easy way to store a key and keep a user authenticated for the duration of the session.

2. What does bcrypt do to help us store passwords in a secure manner.

    Bcrypt helps store passwords in a secure manner by first, hashing the data and then storing a hash digest to compare it to. The hashed data is using a one way hash so the only way to get the password is to guess it and hash the password with the same algorithm.

3. What does bcrypt do to slow down attackers?

    It `hashes` your passwords using a `salt`(additional random data). This increases the computational demand, thus increasing the amount of time, an attacker might need to theoretically guess your password.


4. What are the three parts of the JSON Web Token?

The three parts of the JSON Web Token are:
  1.) Header - This contains the token type and the algorithm
  2.) The payload - This contains things like the id and the user name
  3.) The signature - This contains an encrypted copy of the header and the payload and adds a secret which is a string tagged in to the signature.
