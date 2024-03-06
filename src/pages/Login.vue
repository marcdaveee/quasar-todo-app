<template>
  <div class="container">
    <div class="login">
      <div class="title text-center q-mb-lg">Log in</div>
      <!---Form-->
      <div class="q-mb-md">
        <q-item-label class="label key_result text-weight-bold q-mb-sm"
          >Username:
          <span class="required">*</span>
        </q-item-label>

        <!-- v-model="taskTitle" -->
        <q-input
          :dense="dense"
          rounded
          v-model="text"
          borderless
          placeholder="Enter Username"
          :rules="[(val) => (val !== null && val !== '') || '']"
          hide-bottom-space
          class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 fit"
        />
      </div>
      <div>
        <q-item-label class="label key_result text-weight-bold q-mb-sm"
          >Password:
          <span class="required">*</span>
        </q-item-label>
        <q-input
          :dense="dense"
          rounded
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          borderless
          placeholder="Enter Password"
          :rules="[(val) => (val !== null && val !== '') || '']"
          hide-bottom-space
          class="onboarding-input-field standard onboarding-border-accent-0 onboarding-border-radius-10 fit"
        />
      </div>

      <div>
        <q-btn
          unelevated
          rounded
          label="Log in"
          class="loginbtn"
          :to="{ name: 'dashboard' }"
        />
      </div>

      <div class="text-center q-mt-lg">
        <q-btn flat unelevated class="forgotbtn">Forgot Password?</q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, Router } from "vue";

export default {
  setup() {
    return {
      text: ref(""),
      ph: ref(""),
      dense: ref(false),
      password: ref(""),
      isPwd: ref(true),
    };
  },
};
</script>
<style lang="scss" scope>
//Desktop
.container {
  background-color: #fff;
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  position: fixed;
  .title {
    color: #212121;
    font-family: "Source Sans Pro";
    font-weight: 700;
    text-transform: uppercase;
    min-height: 34px;
    min-width: 58px;
    font-size: 64px;
    white-space: nowrap;
  }
  .uname,
  .pword {
    border-radius: 12px;
    width: 500px;
    background-color: rgba(78, 86, 109, 1);
    color: white;
    padding-left: 19.6px;
    padding-top: 0;
    padding-bottom: 0;
    opacity: 0.8;
  }
  .uname {
    margin-top: 43px;
  }
  .pword {
    margin-top: 33px;
  }
  .forgot {
    font-weight: 400;
    font-size: 16px;
    margin-top: 12px;
    text-align: right;
    color: white;
  }
  .forgotbtn {
    text-transform: capitalize;
  }

  .required {
    color: #ff0000;
  }

  .loginbtn {
    border-radius: 30px;
    background-color: #249990;
    font-family: "Source Sans Pro";
    font-size: 20px;
    font-weight: 400; // regular
    color: #ffffff;
    text-transform: none;
    text-align: center;
    padding: 2px 83px;
    height: 55px;
    font-weight: bold;
    margin-top: 24px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    width: 450px;
  }
}
//Mobile
@media screen and (max-width: 767px) {
  .container {
    height: 100%;

    .login {
      min-height: 374px;
      width: 320px;
      position: absolute;
    }
    .title {
      font-weight: 700;
      line-height: 22px;
      min-height: 34px;
      min-width: 58px;
      font-size: 22px;
    }
    .uname,
    .pword {
      border-radius: 12px;
      width: 320px;
    }
    .uname {
      margin-top: 43px;
    }
    .pword {
      margin-top: 33px;
    }
    .forgot {
      font-weight: 400;
      line-height: 15px;
      margin-top: 12px;
      text-align: right;
      color: white;
    }

    .loginbtn {
      border-radius: 8px;

      font-size: 12px;

      height: 32px;
      font-weight: bold;

      width: 201px;
    }
  }
}
//Tablet
@media screen and (min-width: 768px) and (max-width: 1023px) {
  .container {
    min-width: 768px;
    max-height: 1024px;
    .login {
      min-height: 334px;
      width: 549px;
      position: absolute;
    }
    .title {
      font-size: 20px;
    }
    .uname,
    .pword {
      width: 546px;
    }
    .uname {
      margin-top: 50px;
    }
    .pword {
      margin-top: 38px;
    }
    .forgot {
      font-size: 16px;
    }

    .loginbtn {
      border-radius: 20px;

      font-size: 14px;

      height: 41px;
    }
  }
}

@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,700,600");
</style>
