import React from 'react'
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

const TaskHookForm=({kisiler,submitFn})=>{
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid,errors},
    } = useForm({mode:"onBlur"});


  function myHandleSubmit(data){
    console.log(data);
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak"
    });
    reset();
  }


  return (
    <form className="taskForm" onSubmit={handleSubmit(myHandleSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
          type="text"
          // onChange={handleOthersChange}
          // value={formData.title}
        />
        {errors.title && <p className="input-error">{errors.title.message}</p>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
          // onChange={handleOthersChange}
          // value={formData.description}
        ></textarea>
        {errors.description && (
          <p className="input-error">{errors.description.message}</p>
        )}{" "}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                {...register("people", {
                  required: "Lütfen en az bir kişi seçin",
                  validate: (arr) =>
                    arr.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                })}
                value={p}
                // onChange={handleCheckboxChange}
                // checked={formData.people.includes(p)}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">{errors.people?.message}</p>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
          // disabled={buttonDisabled}
        >
          Kaydet
        </button>
      </div>
    </form>
  )
}
  export default TaskHookForm;
