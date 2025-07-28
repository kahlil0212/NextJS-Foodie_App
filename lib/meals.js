import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export function getMeals(){

    
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug){
    return db.prepare('SELECT * FROM meals where slug = ?').get(slug);
}

export function saveMeal(meal){

    meal.slug = slugify(meal.title, {lower: true}); //creating slug field based on meal title and lowercasing the value
    meal.instructions = xss(meal.instructions); // sanitizing instructions
}