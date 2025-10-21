// Export Supabase data to MySQL INSERT statements
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabase = createClient(
  'https://ucvxfjoongglzikjlxde.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjdnhmam9vbmdnbHppa2pseGRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNDY4OTksImV4cCI6MjA2NTcyMjg5OX0.q_xtNL2LIvOXbMH8atFM5bdez4GpwvYcsI-zjRF71OY'
);

async function exportData() {
  console.log('Exporting stages_recuperation_points...');

  // Export stages
  const { data: stages, error: stagesError } = await supabase
    .from('stages_recuperation_points')
    .select('*');

  if (stagesError) {
    console.error('Error fetching stages:', stagesError);
    return;
  }

  console.log(`Found ${stages?.length || 0} stages`);

  // Export bookings
  console.log('Exporting stage_bookings...');
  const { data: bookings, error: bookingsError } = await supabase
    .from('stage_bookings')
    .select('*');

  if (bookingsError) {
    console.error('Error fetching bookings:', bookingsError);
    return;
  }

  console.log(`Found ${bookings?.length || 0} bookings`);

  // Generate SQL INSERT statements
  let sql = '-- Exported from Supabase\n';
  sql += '-- Date: ' + new Date().toISOString() + '\n\n';

  // Stages INSERT statements
  if (stages && stages.length > 0) {
    sql += '-- Insert stages_recuperation_points\n';
    for (const stage of stages) {
      const values = [
        `'${stage.id}'`,
        `'${stage.city.replace(/'/g, "''")}'`,
        `'${stage.postal_code}'`,
        `'${stage.full_address.replace(/'/g, "''")}'`,
        stage.location_name ? `'${stage.location_name.replace(/'/g, "''")}'` : 'NULL',
        `'${stage.date_start}'`,
        `'${stage.date_end}'`,
        stage.price,
        stage.latitude || 'NULL',
        stage.longitude || 'NULL',
        `'${stage.created_at}'`,
        `'${stage.updated_at}'`
      ];

      sql += `INSERT INTO stages_recuperation_points (id, city, postal_code, full_address, location_name, date_start, date_end, price, latitude, longitude, created_at, updated_at) VALUES (${values.join(', ')});\n`;
    }
    sql += '\n';
  }

  // Bookings INSERT statements
  if (bookings && bookings.length > 0) {
    sql += '-- Insert stage_bookings\n';
    for (const booking of bookings) {
      const values = [
        `'${booking.id}'`,
        `'${booking.stage_id}'`,
        `'${booking.booking_reference}'`,
        `'${booking.civilite}'`,
        `'${booking.nom.replace(/'/g, "''")}'`,
        `'${booking.prenom.replace(/'/g, "''")}'`,
        `'${booking.date_naissance}'`,
        `'${booking.adresse.replace(/'/g, "''")}'`,
        `'${booking.code_postal}'`,
        `'${booking.ville.replace(/'/g, "''")}'`,
        `'${booking.email}'`,
        `'${booking.email_confirmation}'`,
        `'${booking.telephone_mobile}'`,
        booking.guarantee_serenite ? 'TRUE' : 'FALSE',
        booking.cgv_accepted ? 'TRUE' : 'FALSE',
        `'${booking.created_at}'`,
        `'${booking.updated_at}'`
      ];

      sql += `INSERT INTO stage_bookings (id, stage_id, booking_reference, civilite, nom, prenom, date_naissance, adresse, code_postal, ville, email, email_confirmation, telephone_mobile, guarantee_serenite, cgv_accepted, created_at, updated_at) VALUES (${values.join(', ')});\n`;
    }
  }

  // Write to file
  const filename = 'supabase-export.sql';
  fs.writeFileSync(filename, sql);
  console.log(`\n✅ Export complete! File saved: ${filename}`);
  console.log(`Total stages: ${stages?.length || 0}`);
  console.log(`Total bookings: ${bookings?.length || 0}`);
}

exportData();
