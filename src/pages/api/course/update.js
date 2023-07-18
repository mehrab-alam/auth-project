import withValidation from "@/lib/api-middlewares/withValidation";
import { withMethods } from "@/lib/api-middlewares/withMethod";
import * as z from "zod"
import prisma from "../../../lib/prisma"

export default handler = async (req, res) => {
    const body = await req.body
    const { name, age, mobile, email, courseType, coursePrice } = body
    const updateObj = {}
    if (name) updateObj.name = name
    if (age) updateObj.age = age
    if (mobile) updateObj.mobile = mobile
    if (email) updateObj.email = email
    if (coursePrice) updateObj.coursePrice = coursePrice
    if (coursePrice) updateObj.courseType = courseType


    try {
        const updateCourse = await prisma.CourseDetail.update({
            where: {
                courseId: courseId,
                data: updateObj
            },

        });
        return res.status(200).json({ success: true, message: "course deleted!" })
    } catch (error) {
        return res.status(500).json({ message: "something went wrong" })
    }
}