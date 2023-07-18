import withValidation from "@/lib/api-middlewares/withValidation";
import { withMethods } from "@/lib/api-middlewares/withMethod";
import * as z from "zod"
import prisma from "../../../lib/prisma"
export const validateReqBody = z.object({
    name: z.string(),
    email: z.string(),
    courseType: z.enum(["FREE", "PAID"])
})

const handler = async (req, res) => {
    try {
        const body = await req.body
        const { name, age, mobile, email, courseType, coursePrice } = body
        console.log(`this is my body ${body}`)

        const isCourseExist = await prisma.CourseDetail.findFirst({
            where: {
                name: name
            },
            select: {
                name: true
            }
        });
        if (isCourseExist) {
            return res.status(409).json({ success: false, message: "This file is already exist" })
        }
        let courseData = {
            name,
            age: Number(age),
            mobile,
            email,
            courseType,
        }
        if (coursePrice) courseData["coursePrice"] = Number(coursePrice)

        const newCourse = await prisma.CourseDetail.create({
            data: courseData,
        })
        return res.status(200).json({ success: true, message: "New course created successfully", courseId: newCourse.courseId })
    } catch (error) {
        console.log(`this is error ${error}`)
        return res.status(500).json({ message: 'something went wrong' })
    }
};

export default withMethods(["POST"], withValidation(validateReqBody, handler))