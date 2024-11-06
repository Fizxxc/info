const weeklySchedule = {
    "Senin": [
      { time: "07:40 - 09:00", subject: "DDK DKV PERAKTEK -Pa Ade" },
      { time: "09:00 - 10:20", subject: "DDK DKV K3 -Pa Ade" },
      { time: "10:20 - 10:40", subject: "ISTIRAHAT 1" },
      { time: "10:40 - 12:00", subject: "DDK (TDPP) -Pa Bayu Aji" },
      { time: "12:00 - 13:00", subject: "ISTIRAHAT 2" },
      { time: "13:00 - 15:40", subject: "MTK -Pa Uce" },
    ],
    "Selasa": [
      { time: "07:40 - 09:00", subject: "PPKN -Pa Arif" },
      { time: "09:00 - 10:20", subject: "Budaya Sunda -Maam Honey" },
      { time: "10:20 - 10:40", subject: "ISTIRAHAT 1" },
      { time: "10:40 - 12:00", subject: "PAI -Pa Arif" },
      { time: "12:00 - 13:00", subject: "ISTIRAHAT 2" },
      { time: "13:00 - 13:40", subject: "PAI -Pa Arif" },
      { time: "13:40 - 16:20", subject: "B.Indo -Bu Romlah"}
    ],
    "Rabu": [
      { time: "07:40 - 09:00", subject: "DDK DKV PTOFIL TECHNOPRENEUR -Pa Bayu Aji" },
      { time: "09:00 - 10:20", subject: "DDK DKV K3 -Pa Ade" },
      { time: "10:20 - 10:40", subject: "ISTIRAHAT 1" },
      { time: "10:40 - 12:00", subject: "DDK (SKETSA & ILUSTRASI) -Pa Benny" },
      { time: "12:00 - 13:00", subject: "ISTIRAHAT 2 (DDK ILUSTRASI) -Pa Benny" },
      { time: "13:00 - 15:40", subject: "BHS.INGGRIS -Maam Honey" },
    ],
    "Kamis": [
      { time: "07:40 - 09:00", subject: "SEJ.INDO -Bu Ela" },
      { time: "09:00 - 10:20", subject: "P.IPAS -Pa Ichsan" },
      { time: "10:20 - 10:40", subject: "ISTIRAHAT 1" },
      { time: "10:40 - 12:00", subject: "IPAS -Pa Ichsan" },
      { time: "12:00 - 13:00", subject: "ISTIRAHAT 2" },
      { time: "13:00 - 15:40", subject: "INFORMATIKA -Pa Rissal" },
    ],
    "Jumat": [
      { time: "07:40 - 09:00", subject: "B.JEPANG -Sensei Atly" },
      { time: "09:00 - 10:20", subject: "SENI BUDAYA -Bu Ela" },
      { time: "10:20 - 10:40", subject: "ISTIRAHAT 1" },
      { time: "10:40 - 11:20", subject: "SENI BUDAYA -Bu Ela" },
      { time: "11:20 - 13:00", subject: "ISTIRAHAT 2" },
      { time: "13:00 - 14:20", subject: "P.IPAS -Pa Ichsan" },
      { time: "14:20 - 16:20", subject: "PJOK -Pa Fajar"}
    ],
  };

  const preLessonMessages = [
    "Selamat datang! Bersiaplah untuk memulai pelajaran hari ini dengan semangat dan fokus.",
    "Saatnya menimba ilmu! Pastikan semua perlengkapan sudah siap, dan mari kita mulai.",
    "Selamat pagi! Mulailah pelajaran dengan penuh rasa ingin tahu dan semangat baru."
  ];

  const postLessonMessages = [
    "Pelajaran hari ini sudah selesai. Jangan lupa untuk mengulang materi dan bersiap untuk esok!",
    "Terima kasih atas partisipasinya! Gunakan waktu istirahat untuk bersiap menghadapi pelajaran selanjutnya.",
    "Pelajaran hari ini selesai. Semoga semakin memahami materi, sampai jumpa di jam berikutnya!"
  ];

  function updateTime() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString('id-ID');
    document.getElementById('date').textContent = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    updateSchedule();
  }

  function updateSchedule() {
    const now = new Date();
    const day = now.toLocaleDateString('id-ID', { weekday: 'long' });
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const scheduleList = document.getElementById("schedule-list");
    const messageEl = document.getElementById("lesson-message");

    scheduleList.innerHTML = "";

    const todaysSchedule = weeklySchedule[day] || [];

    let foundLesson = false;

    todaysSchedule.forEach(slot => {
      const [start, end] = slot.time.split(" - ").map(t => {
        const [hours, minutes] = t.split(":").map(Number);
        return hours * 60 + minutes;
      });

      if (currentTime >= start && currentTime < end) {
        const listItem = document.createElement("li");
        listItem.textContent = `${slot.time} - ${slot.subject}`;
        scheduleList.appendChild(listItem);
        messageEl.textContent = preLessonMessages[Math.floor(Math.random() * preLessonMessages.length)];
        document.getElementById("start-sound").play();
        foundLesson = true;
      } else if (currentTime === end) {
        messageEl.textContent = postLessonMessages[Math.floor(Math.random() * postLessonMessages.length)];
        document.getElementById("end-sound").play();
      }
    });

    if (!foundLesson) {
      messageEl.textContent = "";
    }
  }

  setInterval(updateTime, 1000);
  window.onload = updateTime;