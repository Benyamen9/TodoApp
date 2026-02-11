import app from './src/app.js';

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is launched on PORT http://localhost:${PORT}`);
});