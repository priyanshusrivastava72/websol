const fs = require('fs');
const readline = require('readline');

const logPath = 'C:\\Users\\Lenovo\\.gemini\\antigravity\\brain\\d6ba6607-4ef8-42d3-bb01-d2f80649f642\\.system_generated\\logs\\transcript.jsonl';

const rl = readline.createInterface({
  input: fs.createReadStream(logPath),
  crlfDelay: Infinity
});

let count = 0;
rl.on('line', (line) => {
  if (count++ < 10) {
    try {
      const parsed = JSON.parse(line);
      console.log(`Type: ${parsed.type}, Source: ${parsed.source}, Step: ${parsed.step_index}`);
      if (parsed.tool_calls) {
        console.log(`  Tool calls: ${parsed.tool_calls.map(tc => tc.name).join(', ')}`);
      }
    } catch (e) {
      console.log('Error parsing line: ', line.substring(0, 100));
    }
  } else {
    rl.close();
  }
});
