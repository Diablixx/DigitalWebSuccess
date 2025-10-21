import pool, { testConnection } from './src/lib/mysql';

async function test() {
  console.log('Testing MySQL connection...');
  console.log('Host:', process.env.MYSQL_HOST);
  console.log('Database:', process.env.MYSQL_DATABASE);
  console.log('User:', process.env.MYSQL_USER);

  await testConnection();

  // Test query
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM stages_recuperation_points');
  console.log('Stages count:', rows[0].count);

  const [bookings] = await pool.query('SELECT COUNT(*) as count FROM stage_bookings');
  console.log('Bookings count:', bookings[0].count);

  process.exit(0);
}

test();
