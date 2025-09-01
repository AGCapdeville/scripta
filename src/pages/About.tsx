export const About = () => {
  return (
    <div className="bg-background h-full w-full min-h-screen text-text-page p-4">
      <div className="text-2xl font-bold text-text-page p-4">About</div>
      <p>Scripta is a word game. The rules are the following:</p>
      <ul className="list-disc list-inside">
        <li>You have 6 attempts to guess a hidden 5-letter word.</li>
        <li>After each guess, the color of the tiles will change to show how close your guess was to the word.</li>
        <li>Green indicates that the letter is in the correct position.</li>
        <li>Purple indicates that the letter is in the word but in the wrong position.</li>
        <li>Gray indicates that the letter is not in the word at all.</li>
      </ul>
      <p>Good luck and have fun!</p>
    </div>
  );
}