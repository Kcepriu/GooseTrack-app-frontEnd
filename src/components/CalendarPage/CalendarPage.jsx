import React, { useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import { CalendarToolbar } from 'components/CalendarToolbar/CalendarToolbar';

const CalendarPage = () => {
  const navigate = useNavigate();

  const { currentDay, currentDate } = useParams();
  const { pathname } = useLocation();
  const typeSelect = pathname.includes('/calendar/day') ? 'day' : 'month';

  const workDate = currentDate || currentDay;

  useEffect(() => {
    if (pathname === '/calendar' || pathname === '/calendar/') {
      navigate(`/calendar/month/${moment().format('YYYY-MM-DD')}`);
    }
  }, [pathname, navigate]);

  const todayHandler = () => {
    // Перейти на день
    console.log('Перейти на день');
    // setToday(moment());
  };

  const prevHandler = () => {
    navigate(
      `/calendar/${typeSelect}/${moment(workDate)
        .subtract(1, typeSelect)
        .format('YYYY-MM-DD')}`
    );
  };

  const nextHandler = () => {
    navigate(
      `/calendar/${typeSelect}/${moment(workDate)
        .add(1, typeSelect)
        .format('YYYY-MM-DD')}`
    );
  };

  const typeMonthHendler = () => {
    // navigate(`/calendar/month/${moment().format('YYYY-MM-DD')}`);
    navigate(`/calendar/month/${workDate}`);
  };

  const typeDayHendler = () => {
    navigate(`/calendar/day/${moment().format('YYYY-MM-DD')}`);
  };

  return (
    <div
      style={{
        marginLeft: '32px',
        marginRight: '32px',
      }}
    >
      <CalendarToolbar
        today={moment(workDate)}
        typeSelect={typeSelect}
        todayHandler={todayHandler}
        prevHandler={prevHandler}
        nextHandler={nextHandler}
        typeMonthHendler={typeMonthHendler}
        typeDayHendler={typeDayHendler}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default CalendarPage;
