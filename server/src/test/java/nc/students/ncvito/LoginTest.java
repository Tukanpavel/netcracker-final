package nc.students.ncvito;


import com.fasterxml.jackson.databind.ObjectMapper;
import nc.students.ncvito.entity.Announcement;
import nc.students.ncvito.entity.Apartment;
import nc.students.ncvito.entity.Role;
import nc.students.ncvito.entity.User;
import nc.students.ncvito.service.AnnouncementService;
import nc.students.ncvito.service.UserService;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.RequestPostProcessor;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.awt.*;
import java.util.Collections;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.StringContains.containsString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@TestPropertySource("/application-test.properties")

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
public class LoginTest {

    @Autowired
    UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    AnnouncementService announcementService;
    @Autowired
    private MockMvc mockMvc;

    @Before

    public void createObjects() {
        User user = new User();

        user.setLogin("admin");
        user.setPassword(passwordEncoder.encode("admin"));
        user.setEmail("email");
        user.setFirstName("Petya");
        user.setLastName("Petrov");
        user.setPhone("123");
        user.setRole(Collections.singleton(Role.USER));

        Apartment apartment = new Apartment();

        apartment.setAddress("qwe");
        apartment.setFloor(1);
        apartment.setRoomCount(1);
        apartment.setSquare(1);

        Announcement announcement = new Announcement();

        announcement.setAuthor(user);
        announcement.setApartment(apartment);
        announcement.setSale(true);
        announcement.setPrice(150);
        announcement.setDescription("announcement_1");
        announcementService.create(announcement);
    }

    @Ignore
    @Test
    public void accessDenied() throws Exception {
        this.mockMvc.perform(get("/announcements"))
                .andDo(print())
                .andExpect(status().isFound())
                .andExpect(redirectedUrl("http://localhost/login"));

    }

    @Ignore
    @Test
    public void badCredentials() throws Exception {
        //HttpHeaders loginHeader=new HttpHeaders()
        this.mockMvc.perform((post("/login")
                .param("username", "Alfred")
                .param("password", "test")))

                .andDo(print())
                .andExpect(status().isFound());
                //.andExpect(redirectedUrl("/login?error"));
    }

    @Test
    public void correctLogin() throws Exception {

        this.mockMvc.perform(get("/login").with(httpBasic("admin","admin")))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    public void unauthorizedUser() throws Exception {
        this.mockMvc.perform(get("/login").with(httpBasic("admin","not_admin")))
                .andDo(print())
                .andExpect(status().isUnauthorized());
    }


    @Ignore
    @Test
    public void registration() throws Exception {

        String login = "testUser";
        String password = "testPassword";
        User user = new User();
        user.setLogin(login);
        user.setPassword(password);
        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = objectMapper.writeValueAsString(user);
        this.mockMvc.perform(post(("/registration")).content(userJson)
                .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());


    }

    @Ignore
    @Test
    public void newUserTest() throws Exception {

        String login = "testUser";
        String password = "testPassword";
        User user = new User();
        user.setLogin(login);
        user.setPassword(password);
        ObjectMapper objectMapper = new ObjectMapper();
        String userJson = objectMapper.writeValueAsString(user);
        this.mockMvc.perform(post(("/registration")).content(userJson)
        .contentType(MediaType.APPLICATION_JSON_UTF8))
                .andDo(print())
                .andExpect(status().isOk());


        this.mockMvc.perform(post("/login").param("username", login).param("password", password))
                .andDo(print())
                .andExpect(status().isFound())
                .andExpect(redirectedUrl("/"));

        this.mockMvc.perform(get("/announcements").with(user(login)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].description",is("announcement_1")))
                .andExpect(jsonPath("$.totalElements",is(1)));



    }
}



