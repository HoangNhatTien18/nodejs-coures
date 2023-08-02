const Course = require("../models/Course");
const {mongooseToOpject, mutilpleMongooseToObject} = require('../../util/mongoose');

class CourseController{

    //[GET] /me/stored/course
    storedCourses(req,res,next){
        let courseQuery = Course.find({});

       
        if(req.query.hasOwnProperty('_sort')){
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            });
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => 
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: mutilpleMongooseToObject(courses)
                })
            )
            .catch(next);
        
    }
    trashCourse(req,res,next){
        Course.findDeleted({}).lean()
            .then(courses => 
                res.render('me/trash-courses', { courses}) )
            .catch(next)
    }

  
}
module.exports = new CourseController();
