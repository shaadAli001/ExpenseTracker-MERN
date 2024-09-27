const moment = require("moment");
const transectionModel = require("../models/transactionModel");

exports.getAllTransaction = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body;
        const transaction = await transectionModel.find({
            ...(frequency !== "custom" ? {
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate(),
                },
            } :
                {
                    date: {
                        $gte: selectedDate[0],
                        $lte: selectedDate[1]
                    }
                }
            ),
            userId: req.body.userId,
            ...(type !== "all" && { type }),
        });
        res.status(200).json(transaction)
    } catch (error) {
        console.log(error);
        res.status(401).json(error);
    }
}

exports.addTransaction = async (req, res) => {
    try {
        const newTrasaction = new transectionModel(req.body);
        await newTrasaction.save();
        return res.status(201).send({
            success: true,
            message: "Transaction Created",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            error,
        })
    }
};

exports.editTransaction = async (req, res) => {
    try {
        await transectionModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload);
        res.status(201).send("Edit successful");
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

exports.deleteTransaction = async (req, res) => {
    try {
        await transectionModel.findOneAndDelete({ _id: req.body.transactionId })
        res.status(200).send("Deleted Successful")
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}