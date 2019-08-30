<?php
namespace Models;

class Profile
{
    /**
     * @var int
     */
    private $id;
    /**
     * @var string
     */
    private $active;
    /**
     * @var string
     */
    private $name;
    /**
     * @var string
     */
    private $last_name;
    /**
     * @var string
     */
    private $email;
    /**
     * @var string
     */
    private $xml_id;
    /**
     * @var string
     */
    private $personal_gender;
    /**
     * @var string
     */
    private $personal_birthdate;
    /**
     * @var string
     */
    private $work_position;
    /**
     * @var string
     */
    private $region;
    /**
     * @var string
     */
    private $city;

    public function __construct(
        int $id,
        string $active,
        string $name,
        string $last_name,
        string $email,
        string $xml_id,
        string $personal_gender,
        string $personal_birthdate,
        string $work_position,
        string $region,
        string $city
        )
    {
        $this->id = $id;
        $this->active = $active;
        $this->name = $name;
        $this->last_name = $last_name;
        $this->email = $email;
        $this->xml_id = $xml_id;
        $this->personal_gender = $personal_gender;
        $this->personal_birthdate = $personal_birthdate;
        $this->work_position = $work_position;
        $this->region = $region;
        $this->city = $city;
    }

    /** @return int */
    public function getId(): int
    {
        return $this->id;
    }

    /** @return string */
    public function getActive(): string
    {
        return $this->active;
    }

    /** @return string */
    public function getName(): string
    {
        return $this->name;
    }

    /** @return string */
    public function getLastName(): string
    {
        return $this->last_name;
    }

    /** @return string */
    public function getEmail(): string
    {
        return $this->email;
    }

    /** @return string */
    public function getXmlId(): string
    {
        return $this->xml_id;
    }

    /** @return string */
    public function getPersonalGender(): string
    {
        return $this->personal_gender;
    }

    /** @return string */
    public function getPersonalBirthdate(): string
    {
        return $this->personal_birthdate;
    }

    /** @return string */
    public function getWorkPosition(): string
    {
        return $this->work_position;
    }

    /** @return string */
    public function getRegion(): string
    {
        return $this->region;
    }

    /** @return string */
    public function getCity(): string
    {
        return $this->city;
    }


}