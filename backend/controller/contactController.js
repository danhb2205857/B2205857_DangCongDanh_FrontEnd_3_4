import express from "express";
import Contact from "../models/contact";

export async function findAll(req, res) {
  const data = await Contact.find();

  return res.status(200).json({
    message: "Lấy danh sách contact thành công",
    data: data
  });
}

export async function create(req, res) {
  try {
    const contact = await Contact.create(req.body);

    if (contact) {
      return res.status(201).json({
        message: "Thêm contact thành công",
        data: contact,
      });
    } else {
      return res.status(500).json({
        message: "Thêm contact không thành công",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Dữ liệu không hợp lệ",
      error: error.message
    });
  }
}

export async function deleteAll(req, res) {
  const data = await Contact.deleteMany();

  if (data) {
    return res.status(200).json({
      message: "Xoá contact thành công",
    });
  } else {
    return res.status(500).json({
      message: "Xoá contact không thành công",
    });
  }
}
  export async function findFavorite(req, res) {
    const data = await Contact.find({ favorite: true });

    return res.status(200).json({
      message: "Lấy danh sách contact thành công",
      data: data,
    });
  }

  export async function findByPk(req, res) {
    const { _id } = req.params

    try {
      const data = await Contact.findById(_id);

      if(data){
        return res.status(200).json({
        message: "Lấy contact thành công",
        data: data,
      });
      }
      else {
        return res.status(404).json({
        message: "Contact không tồn tại"
      });
      } 
    } catch (error) {
      return res.status(400).json({
        message: "ID không hợp lệ",
        error: error.message
      });
    }
  }
  export async function update(req, res) {
    const { _id } = req.params

    try {
      const data = await Contact.findById(_id);

      if(!data){
        return res.status(404).json({
        message: "Contact không tồn tại"
      });
      }

      const update = await Contact.updateOne({ _id }, req.body)

      if(update.modifiedCount > 0) {
        const updatedContact = await Contact.findById(_id);
        return res.status(200).json({
          message: "Cập nhật contact thành công",
          data: updatedContact
        });
      } else {
        return res.status(500).json({
          message: "Cập nhật contact không thành công"
        });
      }
    } catch (error) {
      return res.status(400).json({
        message: "ID không hợp lệ",
        error: error.message
      });
    }
  }
export async function deleteOne(req, res) {
  const { _id } = req.params

  try {
    const data = await Contact.findById(_id);

    if(!data){
      return res.status(404).json({
      message: "Contact không tồn tại"
    });
    }

    const deleteResult = await Contact.deleteOne({ _id });

    if(deleteResult.deletedCount > 0) {
      return res.status(200).json({
        message: "Xóa contact thành công"
      });
    } else {
      return res.status(500).json({
        message: "Xóa contact không thành công"
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "ID không hợp lệ",
      error: error.message
    });
  }
}