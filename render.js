const nunjucks = require('nunjucks');
const fs = require('fs');

vars = {
    portfolio: [
        {
            title: "Sound Show",
            blurb: "Connecting the physics of sound to art and music, the Sound Show is a live performance for primary students of all ages.",
            fulltext: "Fulltext",
            thumb: "/img/sound0.jpg",
        },
        {
            title: "Foldable Flight",
            blurb: "An online interactive workshop for upper primary students that covers the basics of flight, including how to fold two paper planes.",
            fulltext: "Fulltext",
            thumb: "/img/flight0.jpg",
        },
        {
            title: "Magnets & Electricity",
            blurb: "A surprising workshop about how magnets and electricity are connected, and how we use them both to do cool and useful things. ",
            fulltext: "Fulltext",
            thumb: "/img/em0.jpg",
        },
        {
            title: "Software Security",
            blurb: "Three lesson plans for senior high school students to explore careers in software and security.",
            fulltext: "Fulltext",
            thumb: "/img/security0.jpg",
        },
        {
            title: "Market Stall",
            blurb: "A science outreach project that brings surprise, curiosity and delight to community markets, delivered off an ironing board.",
            fulltext: "Fulltext",
            thumb: "/img/stall0.jpg",
        },
        {
            title: "Radio production",
            blurb: "At KFJC 89.7FM I hosted and produced 700+ hours of live radio, plus production work and interviews.",
            fulltext: "Fulltext",
            thumb: "/img/radio0.jpg",
        },
    ]
};

rendered = nunjucks.render('src/index.html', vars);
fs.writeFileSync('html/index.html', rendered);
