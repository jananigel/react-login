export const PasswordGenerator = () => {
  const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialCharacters = '!@#$%^&*()_-+=<>?;';

  // const minLength = 6;
  const maxLength = 12;

  function getRandomCharacter(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters.charAt(randomIndex);
  }

  // Generate necessary characters
  let password = '';
  password += getRandomCharacter(uppercaseLetters);
  password += getRandomCharacter(lowercaseLetters);
  password += getRandomCharacter(numbers);
  password += getRandomCharacter(specialCharacters);

  // Generate remaining characters
  for (let i = password.length; i < maxLength; i++) {
    const allCharacters = uppercaseLetters + lowercaseLetters + numbers + specialCharacters;
    password += getRandomCharacter(allCharacters);
  }

  // Randomize the order of the password
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  return password;
}