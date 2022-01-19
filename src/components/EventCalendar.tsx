import React, {useState} from 'react';
import {Button, Calendar, Layout, Modal, Row} from "antd";
import {IEvent} from "../models/IEvent";
import EventForm from "./EventForm";

interface EventCalendar {
  events: IEvent[]
}

const EventCalendar = (props:EventCalendar) => {

  let [isOpenModal, setIsOpenModal] = useState(false)
  let handleCancel = () => {
    setIsOpenModal(false)
  }
  let handleOk = () => {
    setIsOpenModal(false)
  }

  return (
    <Layout>
      <Modal
        title="Добавить событие"
        visible={isOpenModal}
        onCancel={handleCancel}
        footer={null}
      >
        <EventForm />
      </Modal>
      <Calendar />
      <Row
        justify={"center"}
      >
        <Button
        onClick={()=>{setIsOpenModal(true)}}
        >Добавить событие</Button>
      </Row>
    </Layout>
  );
};

export default EventCalendar;