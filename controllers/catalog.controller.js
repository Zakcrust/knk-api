// @ts-nocheck
const mongoose = require('mongoose');
const catalogSchema = require("../schemas/catalog");
const catalog = mongoose.model("Catalog", catalogSchema);
const axios = require('axios');
require('dotenv').config();
const util = require('../utils/upload.utis');
const saveDir = 'images';
exports.get = async (req, res) => {
    const data = await catalog.find({});
    return res.status(200).send({
        message: "catalog data has been retrieved",
        data: data
    });
}
exports.create = async (req, res) => {
    try {
        var data = {};
        if (req.file == undefined || req.file == null) {
            // return res.status(400).send({
            //     message: "Catalog picture required"
            // })
            data = await catalog.create({
                catalog_name: req.body.catalog_name,
                price: req.body.price
            });
        }
        else {
            const url = await util.saveFile(req.file, saveDir)
            req.body.catalog_picture = url;
            data = await catalog.create(req.body);
        }
        return res.status(201).send({
            message: "catalog has been created",
            data: data
        })

    } catch (error) {
        return res.status(500).send({
            message: error
        })
    }

}

exports.update = async (req, res) => {
    try {
        if (req.file != undefined && req.file != null) {
            const url = await util.saveFile(req.file, saveDir);
            req.body.catalog_picture = url;
        }
        console.log(`update id ${req.params.id}`);
        console.log(`update data ${req.body}`);
        const data = await catalog.findByIdAndUpdate(req.params.id, req.body)
        if (data) {
            return res.status(200).send({
                message: "catalog data has been updated",
                data: data
            })
        }
        else {
            return res.status(400).send({
                message: "catalog not found"
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: error
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const data = await catalog.findByIdAndDelete(req.params.id);
        if (data) {
            return res.status(200).send({
                message: "Catalog has been deleted",
                data: data
            })
        }
        else {
            return res.status(400).send({
                message: "catalog not found"
            })
        }
    } catch (error) {
        return res.status(500).send({
            message: error
        })
    }
}