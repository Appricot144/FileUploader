package com.localuploader.api.controller.upload;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/upload")
public class UploadController {
	
	private final ObjectMapper mapper = new ObjectMapper();

    @PostMapping
    public ResponseEntity<?> upload(@RequestParam(defaultValue = "${upload.path}") String path,
            @RequestParam List<MultipartFile> files) throws JacksonException {
        for (MultipartFile eachFile : files) {
            try {
                Files.write(Paths.get(path, eachFile.getOriginalFilename()), eachFile.getBytes());
            } catch (IOException | InvalidPathException e) {
                e.printStackTrace();
                String res = mapper.writeValueAsString(new UploadResponse("Failed to store a file to fs."));
                return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(res);
            }
        }

        return ResponseEntity.ok().build();
    }
}
