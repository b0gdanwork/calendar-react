import React, {useState} from 'react';
import {Alert, Badge, Button, Calendar, Divider, Layout, Modal, Row} from "antd";
import {IEvent} from "../models/IEvent";
import EventForm from "./EventForm";
import moment, {Moment} from "moment";
import {formatData} from "../utils/data";

interface EventCalendar {
  events: IEvent[]
}

type AllOptionCheckType = 'low'| 'normal' | 'high' | null

const EventCalendar = (props:EventCalendar) => {

  let [selectedValue, setSelectedValue] = useState(moment)
  let [isOpenModal, setIsOpenModal] = useState(false)

  let handleCancel = ():void => {
    setIsOpenModal(false)
  }

  function dateCellRender(value: Moment):JSX.Element {
    const formatedData = formatData(value.toDate())
    const currentDayEvents = props.events.filter(ev=>ev.data === formatedData)

    const getStatus = (item:AllOptionCheckType) => {
      if (item == "high") {
        return "error"
      }
      if (item == "normal") {
        return "warning"
      }
      if (item == "low") {
        return "error"
      }
    }

    return (
      <ul className={'events'}>
        {
          currentDayEvents.map((ev, index)=>{
            return <li key={index} >
              <Badge status={getStatus(ev.importance)} text={ev.description} />
            </li>
          })
        }
      </ul>
    );
  }

  const onSelectCalendar = (selectDate:Moment) => {
    setSelectedValue(selectDate)
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
          selectedValue={selectedValue}
          // handleCancel = {handleCancel}
        />
      </Modal>
      <Layout.Content style={{ padding: '30px 50px' }}>
      <Alert
        style={{marginBottom: '20px'}}
        message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`}
      />
      <Calendar
        value = {selectedValue}
        onSelect={onSelectCalendar}
        dateCellRender={dateCellRender}
      />
      <Divider />
      <Row
        justify={"center"}
      >
        <Button
          type="primary"
          onClick={()=>{setIsOpenModal(true)}}
        >Добавить событие</Button>
      </Row>
        </Layout.Content>
    </Layout>
  );
};

export default EventCalendar;