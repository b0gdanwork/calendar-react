import React, {useState} from 'react';
import {Button, Calendar, Layout, Modal, Row} from "antd";
import {IEvent} from "../models/IEvent";
import EventForm from "./EventForm";
import {Moment} from "moment";
import {formatData} from "../utils/data";

interface EventCalendar {
  events: IEvent[]
}

const EventCalendar = (props:EventCalendar) => {

  let [isOpenModal, setIsOpenModal] = useState(false)

  let handleCancel = () => {
    setIsOpenModal(false)
  }

  function dateCellRender(value: Moment) {
    const formatedData = formatData(value.toDate())
    const currentDayEvents = props.events.filter(ev=>ev.data === formatedData)

    return (
      <div>
        {
          currentDayEvents.map((ev, index)=>{
            return <div key={index}>
              {ev.description}
            </div>
          })
        }
      </div>
    );
  }

  return (
    <Layout>
      <Modal
        title="Добавить событие"
        visible={isOpenModal}
        onCancel={handleCancel}
        footer={null}
      >
        <EventForm
          // handleCancel = {handleCancel}
        />
      </Modal>
      <Calendar
        dateCellRender={dateCellRender}
      />
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