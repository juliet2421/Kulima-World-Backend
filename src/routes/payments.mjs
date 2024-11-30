import express, { json } from "express";
import { Router } from "express";
import FormData from "form-data";
import axios from "axios";
import { checkSchema, matchedData, validationResult } from "express-validator";
import paymentValidationSchema from "../utils/paymentValidationSchemer.mjs";

const router = Router();

// Airtel pay endpoint
router.post("/api/aitel-access/mobile/pay", checkSchema(paymentValidationSchema), async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).json(result.array());

    const data = matchedData(req);
    const { amount, phone } = data;

    const registration = "BEDCOM2422"; 
    const token = "69601cefcba70cd7766c49ff280a2448"; 

    const form = new FormData();
    form.append("airtel", "1"); 
    form.append("token", token); 
    form.append("registration", registration); 
    form.append("amount", amount); 
    form.append("phone", phone); 

    const config = {
        method: "post",
        url: "https://api-sandbox.ctechpay.com/student/mobile/", 
        headers: {
            ...form.getHeaders(),
            'Content-Type': 'multipart/form-data' 
        },
        data: form
    };

    try {
        const response = await axios(config);
        // Extract and return the transaction information
        res.status(200).json({
            success: true,
            message: "Payment processed successfully",
            data: response.data
        });
    } catch (error) {
        console.error({ msg: "Error:", error });
        res.status(500).json({
            success: false,
            message: "Payment processing failed",
            error: error.message
        });
    }
});

//SmartCard endpoint
router.post("/api/aitel-access/order", async (req, res) => {
    const registration = "BEDCOM2622";
    const token = "ed905c7f701083538b6ba366f2e6ed70";
    const amount = 100;

    const form = new FormData();
    form.append("registration", registration);
    form.append("token", token);
    form.append("amount", amount);

    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api-sandbox.ctechpay.com/student/?endpoint=order",
        headers: {
            ...form.getHeaders()
        },
        data: form
    };

    try {
        const response = await axios.request(config);
        res.status(200).json({
            success: true,
            message: "Order processed successfully",
            data: response.data
        });

        //extrating Order_Url
        //redirectinion to that Url
    } catch (error) {
        console.error({ msg: error });
        res.status(500).json({
            success: false,
            message: "Order processing failed",
            error: error.message
        });
    }
});
//Airtel Money Status End point

//Visa/SmartCard endpoint

export default router;
