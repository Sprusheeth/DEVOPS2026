const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/eventBookingDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Event Schema
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    totalSlots: { type: Number, required: true },
    bookedSlots: { type: Number, default: 0 }
});

const Event = mongoose.model('Event', eventSchema);

// ==================== API ENDPOINTS ====================

// GET /events - Retrieve all events (renders in browser)
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.render('events', { events });
    } catch (err) {
        res.status(500).send('Error fetching events: ' + err.message);
    }
});

// POST /events - Create a new event
app.post('/events', async (req, res) => {
    try {
        const { name, date, location, totalSlots } = req.body;
        const newEvent = new Event({
            name,
            date,
            location,
            totalSlots: parseInt(totalSlots),
            bookedSlots: 0
        });
        await newEvent.save();
        res.redirect('/events');
    } catch (err) {
        res.status(500).send('Error creating event: ' + err.message);
    }
});

// POST /events/:id/book - Book a slot for a specific event
app.post('/events/:id/book', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).send('Event not found');
        }
        if (event.bookedSlots >= event.totalSlots) {
            return res.status(400).send('No slots available for this event');
        }
        event.bookedSlots += 1;
        await event.save();
        res.redirect('/events');
    } catch (err) {
        res.status(500).send('Error booking slot: ' + err.message);
    }
});

// Home page - redirect to events
app.get('/', (req, res) => {
    res.redirect('/events');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
