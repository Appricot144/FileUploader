package com.localuploader.api.controller.upload;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
public class UploadController {

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping
    public String upload(@RequestParam("files") List<MultipartFile> files) {
        // TODO property PATH

        for (MultipartFile eachFile : files) {
            try {
                Files.write(Paths.get(uploadPath, eachFile.getOriginalFilename()), eachFile.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        
        return "upload success";
    }
}
