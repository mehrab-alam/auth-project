import withValidation from "@/lib/api-middlewares/withValidation";
import { withMethods } from "@/lib/api-middlewares/withMethod";
import * as z from "zod"
import prisma from "../../../lib/prisma"

export default handler = async (req, res) => {
    try {
        const listOfCourses = await prisma.CourseDetail.findMany({});
        return res.status(200).json({ courses: listOfCourses })
    } catch (error) {
        return res.status(500).json({ message: "something went wrong" })
    }
}